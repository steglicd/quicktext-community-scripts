This extension provides scripts for [Quicktext](https://addons.thunderbird.net/addon/quicktext/), which are maintained by the community.

After installing this extension, its scripts can be includes via the `EXTSCRIPT` tag. The `CaseNumber` script can be includes for example as follows:

```
[[ESCRIPT=quicktext.scripts@community.jobisoft.de|CaseNumber|ABC]]
```

Since the id of the community script add-on is known by Quicktext, the following short hand will work as well:

```
[[CSCRIPT=CaseNumber|ABC]]
```

Note: For a well-known community script add-on hosted on ATN, Quicktext could actually check if it is installed, pull the names of the available scripts and display them as an option, allowing users to include community scripts just like normal scripts.",
