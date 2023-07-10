import { DSFTesting } from '@gov-cy/govcy-frontend-tester';

(async () => {
  let DSFTest = new DSFTesting();
  DSFTest.puppeteerSettings = { headless: false, args: ['--ignore-certificate-errors'], slowMo: 0 };
  DSFTest.showOnlyErrors = true;

  await DSFTest.startTest('Mock', 'reports/testOverlay/');

  // Extract necessary data from DSFTest object
  const dsfTestParams = {
    page: DSFTest.page,
    // Add any other necessary properties or data from the DSFTest object
  };

  // Expose the dsfTestParams object to the browser's context
  await DSFTest.page.exposeFunction('getDSFTestParams', () => dsfTestParams);

  // Inject JavaScript code to add the overlay button on each navigation event
  DSFTest.page.on('domcontentloaded', async () => {
    await DSFTest.page.evaluate(() => {
      // Create the button element
      const button = document.createElement('button');
      button.id = 'DSFRunReport';
      button.innerHTML = 'Do checks';

      // Set styles for the button
      button.style.position = 'fixed';
      button.style.top = '10px';
      button.style.right = '10px';
      button.style.zIndex = '9999';
      button.style.backgroundColor = 'blue';
      button.style.color = 'white';
      button.style.border = 'none';
      button.style.borderRadius = '5px';
      button.style.padding = '10px';

      // Append the button to the document body
      document.body.appendChild(button);

      // Add a click event listener to the button
      button.addEventListener('click', async () => {
      
        alert("Test");
      });
    });
  });

  // Go to the page
  await DSFTest.page.goto('https://gieglas.com', { waitUntil: 'networkidle0' });
  // Set the viewport
  //await DSFTest.page.setViewport({ width: 1920, height: 969 });

  // Close the browser
  // await DSFTest.endTest();
})();
