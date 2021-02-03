# TBD

## Manual svg fixes

* Remove `<title>` element
* Add following to `<defs>` block:

```html
    <filter id="blur">
        <feGaussianBlur stdDeviation="4" />
    </filter>
```

* In `<style>` block, find all `cls-` definitions with `opacity` defined, and add following:

```css
filter: url(#blur);
```
