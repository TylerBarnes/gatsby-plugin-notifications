# `gatsby-plugin-notifications`

This plugin adds toast notifications and sounds when `gatsby develop` is ready and when `gatsby build` completes. This is useful for when either of these processes take a while and you want to multitask and be alerted when Gatsby is ready for you.

## plugin options

```js
{
  resolve: `gatsby-plugin-notifications`,
  // these are the default options
  options: {
    sound: `Glass`, // see ./assets/sounds for available sounds
    toast: true
  }
}
```
