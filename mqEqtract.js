const mix = require('laravel-mix');
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const reporter = require('postcss-reporter');

/**
 * A Laravel Mix plugin that extracts all media queries from a CSS file and writes them to separate output files
 * @param {string} inputFile - The path to the input CSS file
 * @param {string} outputDir - The path to the output directory where the media query files will be written
 */
function mqExtract(inputFile, outputDir) {
  // Resolve the file paths to their absolute values
  const inputFilePath = path.resolve(inputFile);
  const outputDirPath = path.resolve(outputDir);

  // Read the contents of the input file
  const fileContent = fs.readFileSync(inputFilePath, 'utf8');

  // Use PostCSS to parse the CSS and extract the media queries
  postcss([reporter()])
    .process(fileContent, { from: inputFilePath })
    .then((result) => {
      const mediaQueries = result.root.nodes.filter((node) => {
        // Only include nodes that are media queries with min-width conditions
        if (node.type !== 'atrule' || node.name !== 'media') {
          return false;
        }
        return node.params.includes('min-width');
      });

      const newFileContent = result.root.nodes.filter((node) => {
        // Only exclude nodes that are media queries with min-width conditions and are not included in mediaQueries
        if (node.type === 'atrule' && node.name === 'media' && node.params.includes('min-width')) {
          return false;
        }
        return true;
      })

      fs.writeFileSync(inputFilePath, postcss.root({ nodes: newFileContent }).toResult().css, 'utf8');
      console.log(`Media queries removed from ${inputFilePath}`);

      // Group the media queries by their conditions
      const groups = {};
      mediaQueries.forEach((node) => {
        const condition = node.params;
        if (!groups[condition]) {
          groups[condition] = [];
        }
        groups[condition].push(node);
      });

      // Write a separate output file for each group
      Object.keys(groups).forEach((condition) => {
        const safeCondition = condition.replace(/[^0-9]/g, '');
        const outputFilePath = path.join(outputDirPath, `media-queries-${safeCondition}.css`);
        const outputContent = postcss.root({ nodes: groups[condition] }).toResult().css;
        fs.writeFileSync(outputFilePath, outputContent, 'utf8');
        console.log(`Media queries extracted to ${outputFilePath}`);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = mqExtract;
