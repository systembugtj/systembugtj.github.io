---
title: Integrate ninject (3.x) with asp.net core 2.0 (Mac)
date: 2018-03-04
img: mac.jpg
tags:
  - Ninject
  - dotNet Core
  - Asp.net
---

Refer to https://dev.to/cwetanow/wiring-up-ninject-with-aspnet-core-20-3hp

# Create a asp.net core project in Visual Studio for Mac

TBD

# Startup.cs
```csharp
public class Startup
{
    private readonly AsyncLocal<Scope> scopeProvider = new AsyncLocal<Scope>();
    private IKernel Kernel { get; set; }

    private object Resolve(Type type) => Kernel.Get(type);
    private object RequestScope(IContext context) => scopeProvider.Value;

    private sealed class Scope : DisposableObject { }

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddMvc();

        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

        services.AddRequestScopingMiddleware(() => scopeProvider.Value = new Scope());
        services.AddCustomControllerActivation(Resolve);
        services.AddCustomViewComponentActivation(Resolve);
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        this.Kernel = this.RegisterApplicationComponents(app);

        app.UseMvc();
    }

    private IKernel RegisterApplicationComponents(IApplicationBuilder app)
    {
        // IKernelConfiguration config = new KernelConfiguration();
        var kernel = new StandardKernel();

        // Register application services
        foreach (var ctrlType in app.GetControllerTypes())
        {
            kernel.Bind(ctrlType).ToSelf().InScope(RequestScope);
        }

        // This is where our bindings are configurated
        kernel.Bind<ITestService>().To<TestService>().InScope(RequestScope);

        // Cross-wire required framework services
        kernel.BindToMethod(app.GetRequestService<IViewBufferScope>);

        return kernel;
    }
}
```


# RequestScopingStartupFilter.cs

```csharp
public sealed class RequestScopingStartupFilter : IStartupFilter
    {
        private readonly Func<IDisposable> requestScopeProvider;

        public RequestScopingStartupFilter(Func<IDisposable> requestScopeProvider)
        {
            if (requestScopeProvider == null)
            {
                throw new ArgumentNullException(nameof(requestScopeProvider));
            }

            this.requestScopeProvider = requestScopeProvider;
        }

        public Action<IApplicationBuilder> Configure(Action<IApplicationBuilder> nextFilter)
        {
            return builder =>
            {
                ConfigureRequestScoping(builder);

                nextFilter(builder);
            };
        }

        private void ConfigureRequestScoping(IApplicationBuilder builder)
        {
            builder.Use(async (context, next) =>
            {
                using (var scope = this.requestScopeProvider())
                {
                    await next();
                }
            });
        }
    }
```

# AspNetCoreExtensions.cs (Use C# extention to extend IServiceCollection)
```csharp
using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

public static class AspNetCoreExtensions
{
    public static void AddRequestScopingMiddleware(this IServiceCollection services, 
        Func<IDisposable> requestScopeProvider)
    {
        if (services == null)
        {
            throw new ArgumentNullException(nameof(services));
        }

        if (requestScopeProvider == null)
        {
            throw new ArgumentNullException(nameof(requestScopeProvider));
        }

        services
            .AddSingleton<IStartupFilter>(new
                RequestScopingStartupFilter(requestScopeProvider));
    }

    public static void AddCustomControllerActivation(this IServiceCollection services,
            Func<Type, object> activator)
    {
        if (services == null) throw new ArgumentNullException(nameof(services));
        if (activator == null) throw new ArgumentNullException(nameof(activator));

        services.AddSingleton<IControllerActivator>(new DelegatingControllerActivator(
            context => activator(context.ActionDescriptor.ControllerTypeInfo.AsType())));
    }
}
```

# Create Activators class
```csharp
public sealed class DelegatingControllerActivator : IControllerActivator
{
    private readonly Func<ControllerContext, object> controllerCreator;
    private readonly Action<ControllerContext, object> controllerReleaser;

    public DelegatingControllerActivator(Func<ControllerContext, object> controllerCreator,
        Action<ControllerContext, object> controllerReleaser = null)
    {
        this.controllerCreator = controllerCreator ?? 
            throw new ArgumentNullException(nameof(controllerCreator));
        this.controllerReleaser = controllerReleaser ?? ((_, __) => { });
    }

    public object Create(ControllerContext context) => this.controllerCreator(context);
    public void Release(ControllerContext context, object controller) =>             
        this.controllerReleaser(context, controller);
} 
```
# ApplicationBuilderExtensions.cs

```csharp
using System;
using System.Globalization;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.Extensions.DependencyInjection;
using Ninject;

public static class ApplicationBuilderExtensions
{
    public static void BindToMethod<T>(this IKernel config, Func<T> method) => config.Bind<T>().ToMethod(c => method());

    public static Type[] GetControllerTypes(this IApplicationBuilder builder)
    {
        var manager = builder.ApplicationServices.GetRequiredService<ApplicationPartManager>();

        var feature = new ControllerFeature();
        manager.PopulateFeature(feature);

        return feature.Controllers.Select(t => t.AsType()).ToArray();
    }

    public static T GetRequestService<T>(this IApplicationBuilder builder) where T : class
    {
        if (builder == null) throw new ArgumentNullException(nameof(builder));

        return GetRequestServiceProvider(builder).GetService<T>();
    }

    private static IServiceProvider GetRequestServiceProvider(IApplicationBuilder builder)
    {
        var accessor = builder.ApplicationServices.GetService<IHttpContextAccessor>();

        if (accessor == null)
        {
            throw new InvalidOperationException(      
        typeof(IHttpContextAccessor).FullName);
        }

        var context = accessor.HttpContext;

        if (context == null)
        {
            throw new InvalidOperationException("No HttpContext.");
        }

        return context.RequestServices;
    }
}
```

# ValuesController 
```csharp
[Route("api/[controller]")]
public class ValuesController : Controller
{
    private readonly ITestService testService;

    // Ninject support constrcutor injection
    public ValuesController(ITestService testService)
    {
        this.testService = testService;
        this.factory = factory;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var result = this.testService.GetData();

        return this.Ok(result);
    }
}
```

# TestService.cs and ITestService.cs

```csharp
public interface ITestService
{
    string GetData();
}

public class TestService : ITestService
{
    public string GetData()
    {
        return "some magic string";
    }
}
```
