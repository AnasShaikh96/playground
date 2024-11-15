// const fs = require('fs');
// const path = require('path');

// // Helper function to parse CSS file content and return class-property map
// function parseCSS(filePath) {
//   const cssContent = fs.readFileSync(filePath, 'utf8');
//   const classMap = {};

//   // Regular expression to match class selectors and their properties
//   const regex = /\.([a-zA-Z0-9_-]+)\s*\{([^}]+)\}/g;
//   let match;

//   // Loop through all matches in the CSS content
//   while ((match = regex.exec(cssContent)) !== null) {
//     const className = match[1].trim();
//     const properties = match[2].trim().replace(/\s+/g, ' '); // Normalize spaces
//     classMap[className] = properties;
//   }

//   return classMap;
// }

// // Function to replace classes in the HTML file
// function replaceClassesInHTML(htmlPath, classMap1, classMap2) {
//   let htmlContent = fs.readFileSync(htmlPath, 'utf8');

//   // Loop through classMap1 to replace class names in HTML content
//   for (const class1 in classMap1) {
//     for (const class2 in classMap2) {
//       if (classMap1[class1] === classMap2[class2]) {
//         const regex = new RegExp(`\\b${class1}\\b`, 'g');
//         htmlContent = htmlContent.replace(regex, class2);
//       }
//     }
//   }

//   return htmlContent;
// }

// // Main function to perform the task
// function main(cssFilePath1, cssFilePath2, htmlFilePath) {
//   const classMap1 = parseCSS(cssFilePath1);
//   const classMap2 = parseCSS(cssFilePath2);
//   const updatedHTML = replaceClassesInHTML(htmlFilePath, classMap1, classMap2);

//   // Output the updated HTML
//   const outputFilePath = path.join(path.dirname(htmlFilePath), 'updated-' + path.basename(htmlFilePath));
//   fs.writeFileSync(outputFilePath, updatedHTML, 'utf8');
//   console.log(`Updated HTML saved to ${outputFilePath}`);
// }

// // Example usage
// const cssFilePath1 = './style1.css';
// const cssFilePath2 = './style2.css';
// const htmlFilePath = './index.html';

// main(cssFilePath1, cssFilePath2, htmlFilePath);
