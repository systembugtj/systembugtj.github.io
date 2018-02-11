---
layout: post
title: Use Nuke in the App
date:   2018-02-10 09:25:46 +0800
description: 
img: mac.jpg # Add image post (optional)
tags: [iOS, Swift, Nuke] # add tag
---

Swift is the major reason, I start to work on iOS/Mac app. Before I use electron and Xamarin Form

There are many Image Loading/Cache library on github, like SDWebImage (objc), Kingfisher (Swift).

And I found a new one, and some useful plugin.

Nuke <https://github.com/kean/Nuke>
Alamofire <https://github.com/kean/Nuke-Alamofire-Plugin>
Gifu <https://github.com/kean/Nuke-Gifu-Plugin>
RxNuke <https://github.com/kean/RxNuke>

# Create a Manager

```swift
class NukeManager {
    public static let shared: Nuke.Manager = {
        // Define decoding sequence
        let animatedImageDecode = AnimatedImageDecoder() // Use Gifu for 
        let dataDecoder = Nuke.DataDecoder()
        let webpDataDecoder = WebPDataDecoder()

        // Make a decoder which supports animated GIFs.
        let decoder = Nuke.DataDecoderComposition(decoders: [webpDataDecoder, animatedImageDecode, dataDecoder])
    
        // Updates `Cache` cost calculation block.
        let cache = Nuke.Cache().preparedForAnimatedImages()
        
        var options = Nuke.Loader.Options()
        // Disable processing of animated images.
        options.processor = { image, request in
            return image is AnimatedImage ? nil : request.processor
        }
        
        // Use the Nuke default configuration
        let sessionManager = Alamofire.SessionManager(configuration: Nuke.DataLoader.defaultConfiguration)
        
        // Use Alamofire Loader, with preconfigured Decoder
        let loader = Nuke.Loader(loader: NukeAlamofirePlugin.DataLoader(manager: sessionManager), decoder: decoder, options: options)
        
        return Manager(loader: loader, cache: cache)
    }()
}
```

# Use the manager to loadImage

```swift
NukeManager.manager.loadImage(with: URL(), into: animatedImageView)
```

# Some tweak to Nuke WebP Plugin

## Add default constructor, if not WebP format return nil
```swift
public struct WebPDataDecoder: Nuke.DataDecoding {

    //https://github.com/kean/Nuke-Gifu-Plugin/blob/master/Source/AnimatedImage.swift#L64
    public init() {}
    
    public func decode(data: Data, response: URLResponse) -> Image? {
        if !data.isWebPFormat {
            return nil
        }
        return decodeWebPData(data)
    }

}
```
## Check if Data is WebP

```swift
// MARK: - WebP Format Testing
extension Data {
    var isWebPFormat: Bool {
        if count < 12 {
            return false
        }
        
        let endIndex = index(startIndex, offsetBy: 12)
        let testData = subdata(in: startIndex..<endIndex)
        guard let testString = String(data: testData, encoding: .ascii) else {
            return false
        }
        
        if testString.hasPrefix("RIFF") && testString.hasSuffix("WEBP") {
            return true
        } else {
            return false
        }
    }
}
```