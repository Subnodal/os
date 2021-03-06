# os
subOS, Subnodal's operating system built for the web. https://subnodal.com/os

Fun fact: subOS is now over 24,000 source lines of code (sloc) long! With your
contributions, we can make this number rise up and up!

## Licence
subOS is licensed by the [Subnodal Closed-Source Licence for subOS Front-End](LICENCE.md).
You may not distribute subOS, as explained in the licence.

Please note: This is only the front-end of subOS, the back-end is completely
closed-source and only accessible by Subnodal employees.

## Structure
subOS is run from only one HTML file, [index.html](https://github.com/Subnodal/os/blob/master/index.html).
index.html acts as the screen that is viewed in a browser. There is only one
HTML file so that there isn't any excessive loading time between screens ─
you only have to load one big file (similar to booting a real computer) which
can go into the browser cache for quicker loading later (that's if you're on
the web version, the native version does not take as long to load as the file
is stored locally).

To make it easier for development, the `<screen>` tag is defined (scripts at
[funcs/screens](https://github.com/Subnodal/os/tree/master/funcs/screens)) so
that there is a sense that there are multiple HTML files but really there
isn't. There is also the benefit of screen transitions too.

### Using the `<screen>` tag
The `<screen>` tag requires a `name` attribute and a `data-readable` tag so
that subReader can tell the user that there was navigation:

```html
<screen name="myScreenName" data-readable="my lovely screen"> ... </screen>
```

The `<screen>` tag should also have an info bar (`<div class="infoBar">`, you
can copy it from another screen and change the buttons, but leave the time in).

To transition to another screen in JavaScript, do either of the following:

```js
// Instantly change screen (generally deprecated; not as friendly)
screens.show("myScreenName");

// Fade into another screen with a time period of 500ms (friendliest)
screens.fade("myScreenName");

// Fade into another screen with a time period (generally deprecated; can be slow)
screens.fade("myScreenName", 1000);
```

The magical functionality of screens are found at the script at [funcs/screens](https://github.com/Subnodal/os/tree/master/funcs/screens).

## Translating subOS
subOS is proud to be multilingual and internationalised/internationalized
(known in the dev world as `i18n`, localisation/localization is called `l12n`
to get past the s/z issue. The numbers represent the number of missing
letters)! However i18ning can only be possible with your support, whether it is
from translating the OS into your native language or simply including the `@`
or `_` in your code (see below).

The power of i18n is brought to you by the script at [funcs/lang](https://github.com/Subnodal/os/tree/master/funcs/lang).

### i18ning your HTML file
In static HTML elements you can use the `@` symbol before strings:

```html
<p>@Some sample text here</p>
```

If you wish for an element to not be translated, remove the `@`. If the element
is generated by the user (appended to the DOM) and you don't want it
translated, put the class `noTranslate`:

```html
<p class="noTranslate">I was generated by the user!</p>
```

### i18ning your scripts
Your scripts are also easy to i18n. For all strings that you want to translate,
wrap your string like this:

```js
_("Your string will be safe and sound here")
```

The magic happens with the `_` function (it is actually called `_` in the
code), an alias for `lang.translate`. Trust me, you don't want to write
`lang.translate` every time you have to translate a string! Use `_` instead.

Now what about numbers?! Numbers **can't** be translated like this:

```js
_("You got the number " + luckyNumber + "! Congrats!")
```

You have to do it like this (due to word orders, as well as number formatting):

```js
_("You got the number %! Congrats!", luckyNumber)
```

The `%` will be replaced with `luckyNumber` here. For even more numbers:

```js
_("You got the number %! The number % was also another number.", [luckyNumber, otherNumber])
```

Don't forget the list as the second parameter above!

If you want to set some HTML content using JS, construct it like the following:

```js
$(".myDiv").html(`
    <span>@You got the lucky number %!|` + luckyNumber + `</span> <a>Something else</a>
`);
```

For more than one part:

```js
$(".myDiv").html(`
    <span>@You got the lucky number %! The number % was also another number.|` + luckyNumber + `,` + otherNumber + `</span> <a>Something else entirely</a>
`);
```

You should also use the `@` in the `data-readable` attribute too so that they
also get translated.

### Making translations for subOS
If you want to translate the text of subOS from English (United Kingdom),
follow this section! Currently there are only 2 languages, English (United
Kingdom) and French (France).

Translations are stored in the lang folder, with the language code
(hyphen-separated) followed by `.js` as the translation file. It is formatted
like this:

```js
// Language name (Optional language locale name)

lang.list["ln-CD"] = {
    "Original en-GB text here blah blah blah": "Translated ln-CD text here blah blah blah",
    "Hello, world!": "Canoa, modalo!",
    "blah blah blah": "coa coa coa"
    "You have got the number %!": "To garo % lo nume!"
    
    ...

};
```

Where `ln-CD` is the language code. For plurals, use a JS object instead of a
string:

```js
    ...

    "You have % new messages": {
        sing: "To garo % nen mesolano",
        pl: "To garo % nen mesolanos"
    }

    ...
```

Oh, and don't forget to add a `<script>` tag to index.html to link it correctly!

Lead developers will review your language submission and add the language entry
to language selection menus etc.

#### Auto-generation
To auto-generate the language file, play around with the OS and open the parts
you want to translate. Then in the developer console, type:

```js
lang.translogToJSObj();
```

This should return a new language file.

To get more needed translations, type:

```js
lang.translogErrorsToJSSnippet();
```

This'll create a snippet that gets the errors and turns them into a snippet
that you can append into the file.

We'll make the process easier soon! Don't worry.
