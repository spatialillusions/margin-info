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

## Node Version

A command line version written for Node can be used to generate SVG files on disk.

To install

``` console
npm -g install
```

Sample usage

```
margin-info usage

margin-info scalebar 50000  true true true
margin-info slope 50000 40
margin-info grid  0.6   3.6 2016 11S black


margin-info scalebar 50000  true true true
margin-info slope 50000 40
margin-info grid  0.6   3.6 2016 11S black
```

## Serverless or AWS Lambda Version

As well as using the command line, the Javascript code for generating SVGs can be run without setting up any web servers.  This section describes both testing locally using `serverless invoke local` from  [Serverless.com](https://serverless.com) and testing on an [AWS Lambda](https://aws.amazon.com/lambda/) configuration.

* For details on the command line reference for Serverless, see
https://serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/
* For AWS command line options, type in your shell, `aws lambda invoke help`

#### Testing from the `serverless` command line

```
# Serverless commands
npm install -g serverless
# serverless create --template aws-nodejs --path ./test-path/

cd dist

# Get JSON response back to shell
serverless invoke local -f margininfo --data '{"method": "scalebar", "args": [50000, true, true, true] }'
serverless invoke local -f margininfo --data '{"method": "slope", "args":[50000, 40] }'
serverless invoke local -f margininfo --data '{"method": "grid", "args": [0.6, 3.6, "2016", "11S", "black"] }'

# Save SVG
serverless invoke local -f margininfo --data '{"method": "scalebar", "args": [50000, true, true, true] }' \
  | json body > scalebar.svg

serverless invoke local -f margininfo --data '{"method": "slope", "args":[50000, 40] }' \
  | json body > slope.svg

serverless invoke local -f margininfo --data '{"method": "grid", "args": [0.6, 3.6, "2016", "11S", "black"] }' \
  | json body > grid.svg
```

#### Testing from the `aws` command line

```

# AWS commands
npm install aws-sdk -g  # for `aws`
npm install json -g     # for `json`

# list your lambda functions on your AWS accoutns
aws lambda list-functions

# Pass in parameters and save the response
aws lambda invoke --function-name margin-info \
  --payload '{"method": "scalebar", "args": [50000, true, true, true] }' \
  aws-lambda-response-scalebar.json

aws lambda invoke --function-name margin-info \
  --payload '{"method": "slope", "args":[50000, 40] }'  \
  aws-lambda-response-slope.json

aws lambda invoke --function-name margin-info \
  --payload '{"method": "grid", "args": [0.6, 3.6, "2016", "11S", "black"] }'  \
  aws-lambda-response-grid.json

# extract the SVG from the response
cat aws-lambda-response-scalebar.json | json body > scalebar.svg
cat aws-lambda-response-slope.json | json body > slope.svg
cat aws-lambda-response-grid.json | json body > grid.svg
```

## License and Contact
The library is developed by Måns Beckman, www.spatialillusions.com, and is provided under a MIT License.
