Data
====

You can preview the data in this [Fusion
Table](https://www.google.com/fusiontables/DataSource?docid=1NVEBLj1SdQo07QeaVK0EJOa6r8wkKYP0umEz-m3W).

It is originally from [The FEC's
Website](http://www.fec.gov/finance/disclosure/ftpdet.shtml#a2015_2016),
where they also have [data
dictionaries](http://www.fec.gov/finance/disclosure/metadata/DataDictionaryOperatingExpenditures.shtml).

The data has been reformatted, cleaned, and merged. Reformatted and
cleaned files are:

* [expenditures.csv](expenditures.csv): Operating Expenditures from FEC
* [committees.csv](committees.csv): Committee Master File from FEC
* [candidates.csv](candidates.csv): Candidate Master File from FEC
* [candidates_to_committees.csv](candidates_to_committees.csv) Candidate Committee Linkage File from
  FEC

These have then been merged and selected for interesting columns into

* [merged_expenditures.csv](merged_expenditures.csv)
* [merged_expenditures_5000.csv](merged_expenditures_5000.csv): a random sample of 5000 records from
  merged_expenditures
