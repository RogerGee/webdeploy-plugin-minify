# webdeploy-plugin-minify

> Build plugin to minify JavaScript and CSS

## Synopsis

This is a lightweight build plugin for compressing JavaScript and CSS. It uses `uglify-js` and `uglifycss` to do the heavy-lifting.

This plugin only processes targets having either the `.js` or `.css` extensions. It will automatically select the required compression library based off of the target file name extension.

## Install

~~~
npm install --save-dev @webdeploy/plugin-minify
~~~

## Config

### `rename`

- Type: `boolean`
- Default: `true`

Determines whether the plugin renames any target it processes. If enabled, then target `X.ext` will be renamed `X.min.ext`.

### Example:

~~~javascript
{
  id: "minify",
  rename: true
}
~~~

