#Fort.js

Modern progress bar for form completion.
All you do is add the form and Fort.js' algorithm will take care of the rest. Best of all, it's super small.

##Usage
Using Fort is so simple, it's simple. All you do is insert `fort.min.js` and  `fort.min.css` into the `<head>` then pop in an `<input>` into `<div class="top">`. Anything outside of the `<div>` won't count. Now you just call the effect (Scroll down to the the "Effects" section for more). Yep, that's all there is to it. Fort does the rest.
```html
<head>
  <script src="fort.min.js"></script>
  <link rel="stylesheet" href="fort.min.css">
</head>
<body>
  <script>
  flash()
  </script>
</body>
```


Think the progress bar speed is too slow or too fast? No worries. In the stylesheet just change the speed to your desired liking.
```css
transition: all 1s;
```
Additionally if you prefer the bottom rather the top, just change `top: 0;` to `bottom: 0;` in the stylesheet.

Want to change the height? Open the stylesheet and change `height: 4px;` to your liking.

**Certain fields:**

If you want to include only certain fields add a class named `ignore` to the field. Fort will not detect the field after you do so.
##Effects
 * [Default](http://colourity.github.io/) -`solid()`
 * [Gradient](http://colourity.github.io/gradient) - `gradient()`
 * [Sections](http://colourity.github.io/sections) - `sections()`
 * [Flash](http://colourity.github.io/flash) - `flash()`



**Changing the colors:**
* Default - Fire up the stylesheet and simply change it with `background`.

* Gradient - Open the stylesheet and look for `background` located in the `.top` selector.

* Sections - You'll need to find `sections()` in the script. Then you'll see an array named `cols`. Note that the colors are declared twice, this is to give it a crisp look.

* Flash - Crack open the script and look for `flash()` then edit the variable `cols` with your desired colors.


##Coming soon
 * More setting
 * More effects. Have an idea? [Email](mailto:idris@colourity.com) me!
 * jQuery version
 
##License
Fort.js is licensed under the MIT license.(http://opensource.org/licenses/MIT)
It's pretty simple, but here's the definition we get

The MIT License is a permissive license that is short and to the point. It lets people do anything they want with your code as long as they provide attribution back to you and don't hold you liable.
##Acknowledgements

**Fort.js** is authored and maintained by Idris Khenchil


CoffeScript version by [jasteralan](https://github.com/jasteralan), right [here](https://github.com/jasteralan/Fort.js). Thanks! 

Feel free to check out the demo [here](http://colourity.github.io/). Used Fort in a project? I'd love to see it, [email](mailto:idris@colourity.com) me.
