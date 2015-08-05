Data as Medium
==============

This is the source repo for code for the Data as Medium class.

Usage
-----

First, install NodeJS if you haven't already.

    open https://nodejs.org/

or

    brew install nodejs

Then, in the same directory as this file,

    npm install http-server -g
    http-server .

to start an HTTP server in the current directory.

Next
----

Take a look at [bars.html](bars.html) for a simple D3 example, then go
over to [the data directory](data/) to poke around the data.

Examples
--------

* [bars](bars.html): a simple bar chart counting transactions per state
* [map](map.html): draw a choropleth map of the amounts spent by zip
  code
* [multi pie](multi_pie.html): an example of some involved data munging
  and mapping to multi-level pie charts. Shows expenditures by party on
  some transportation services, based on a simple keyword match.
