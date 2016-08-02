# margin-info
Library for generating margin information for maps in SVG format.

## Introduction

Using the fact that you can use real world units, like centimeter and milimeter, in SVG elements makes it possible to create all scale based elements around your map directly with SVG. The following elements has been created with NGA's Cartographers Handbook as a guide for look and feel.

### Grid Declination Diagram

![Figure 13](docs/griddeclinationdiagram.png?raw=true)

### Scale bar

![Figure 13](docs/scalebar.png?raw=true)

### Slope guide

![Figure 13](docs/slopeguide.png?raw=true)


## Usage
The library contains two javascript functions, one for generating a scale bar, and one for generating a slope guide, they are located in the dist folder.

### griddeclinationdiagram(TrueNorth,MagneticNorth,year,zone,color)

The grid declination diagram function, is called with five parameters:

 - TrueNorth, the true north direction, degrees.
 - MagneticNorth, the magnetic north direction, degrees.
 - year, the year the diagram is calculated for.
 - zone, the UTM zone.
 - color, the color of the diagram.

### scalebar(scale,showkm,showmiles,shownautical)

The scale bar function is called with four parameters:

 - scale, the scale you want your scale bar to represent. (The inverted scale is used here, so if you want 1:50 000, you set it to 50000)
 - showkm, if kilometer scale bar should be shown, bool.
 - showmiles, if miles scale bar should be shown, bool.
 - shownautical, if nautical miles scale bar should be shown, bool.
 
The function returns a string representing the SVG as XML and it can be inserted into any element.

### slopeguide(scale,contourInterval)

The slope guide function is called with two parameters:

 - scale, the scale you want your scale bar to represent. (The inverted scale is used here, so if you want 1:50 000, you set it to 50000)
 - countourInterval, that is the contour interval in meters that you want your slope guide to show.
 
The function returns a string representing the SVG as XML and it can be inserted into any element.

## License and Contact
The library is developed by Måns Beckman, www.spatialillusions.com, and is provided under a MIT License.