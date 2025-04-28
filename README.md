This extension provides scripts for [Quicktext](https://addons.thunderbird.net/addon/quicktext/), which are maintained by the community.

After installing this extension, its scripts can be includes via the `ESCRIPT` tag. The `CaseNumber` script can be included for example as follows:

```
[[ESCRIPT=quicktext.scripts@community.jobisoft.de|CaseNumber|ABC]]
```

Since the id of the community script add-on is known by Quicktext, the following short hand will work as well:

```
[[CSCRIPT=CaseNumber|ABC]]
```
