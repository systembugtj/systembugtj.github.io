---
layout: post
title: Use redux with react
date: 2016-07-24 10:42:20
description: 
img: react.png
tags: [Javascript, React]
---

# package
```shell
$ npm install react-route redux react-router-redux (works better with react-router)
```
#action
A plain javascript object. Flux Standard Action could be the definition of action crossing app.
```javascript
// define action name into a constants
import ActionNames from "../constants/actions"

let action = {
    type: ActionsNames.DOSOMTHING
    payload: {
        // a json friendly javascript plain object.
    },
    error: true, // indicate the play is the error object.
    meta: meta information relate to payload, but not a payload.
}
```
# Utility Function
```shell
npm install flux-standard-action
```
```javascript
import { isFSA } from 'flux-standard-action';
```
# reducer
Do not change state, should alwasy return new if require change.
Do not call api or Date.Now style function which is part of action

# connect in react

```javascript
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

function mapStateToProps(state) {
    return {
        number: state.number //  bind store value to react props
    }
}

//bind action with (args) =&gt; dispatch(action(args));
function mapDispatchToProps() {
}
```

# Notes: if don’t provide mapDispatchToProps, should dispath action with
```javascript
this.props.dispatch(someActionCreator('arg'))
```
#A sample how to use
```javascript
function mapStateToProps(state) {
  return {
    propName: state.propName
  };
}

function mapDispatchProps(dispatch) {
  return {
    someAction: (arg) =&gt; dispatch(someActionCreator(arg)),
    otherActions: bindActionCreators(actionCreators, dispatch)
  };
}

class App extends Component {
  render() {
    // `mapStateToProps` 和 `mapDispatchProps` 返回的字段都是 `props`
    const { propName, someAction, otherActions } = this.props;
    return (
      &lt;div onClick={someAction.bind(this, 'arg')}&gt;
        {propName}
      &lt;/div&gt;
    );
  }
}

export default connect(mapStateToProps, mapDispatchProps)(App);

// Another way
connect(
    state =&gt; { 
        number: state.number
    },
    {increase, descrease}
)(App);
```