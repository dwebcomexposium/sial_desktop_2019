# Icomoon font for SIAL2020

## First step : Update font on Icomoon app

* Go to Icomoon App : https://icomoon.io/app/#/projects
* Load project if exist on dashboard or Import project using [config.json file](./config.json) in this folder.
* Add icon (.svg) to icons list by drag&drop or clicking *Import Icons* button.
* Edit icon with _pen_ tool or `alt+click`.
  * Delete icon colors _(drop icon)_.
  * Edit icon name.
* Generate font with bottom action bar button *Generate Font*.
* optional: Add replacement/default glyph.
* Download the font !


* Download [config file](./config.json) from Project dashboard to overwrite existing file on local project.

## Second step : Update font on local project

* Decompress icon font archive.
* Overwrite existing [config.json file](./config.json) and font files ([eot,svg,ttf,woff...](./icomoon.woff))
* Update project [icon.scss file](/ouragan_sources/scss/components/icon.scss) with new values in downloaded archive *variables.scss* file.
