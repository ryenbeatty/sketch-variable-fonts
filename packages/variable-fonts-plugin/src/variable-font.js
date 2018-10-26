import React from "react";
import sketch from "sketch";
import BrowserWindow from "sketch-module-web-view";
import { render, Image } from "react-sketchapp";

const captureCoordinates = {
  x: 300,
  y: 300
};

function runCommand(command, args) {
  var task = NSTask.alloc().init();
  task.setLaunchPath_(command);
  task.arguments = args;
  task.launch();
  task.waitUntilExit();
  return task.terminationStatus() == 0;
}

const base64Helper = data => {
  return String(data.base64EncodedStringWithOptions(nil));
};

const imageToBase64 = image => {
  const tiffData = image.TIFFRepresentation();

  const bitmap = NSBitmapImageRep.imageRepWithData(tiffData);

  const imageData = bitmap.representationUsingType_properties(
    NSPNGFileType,
    NSMutableDictionary.dictionary()
  );

  return base64Helper(imageData);
};

export default function() {
  const options = {
    identifier: "unique.id",
    width: 700,
    height: 400,
    frame: false,
    center: true,
    backgroundColor: "#ffffff",
    offscreen: true
  };

  const browserWindow = new BrowserWindow(options);
  browserWindow.loadURL("variable-fonts-ui/index.html");

  const document = sketch.getSelectedDocument();
  const selection = document.selectedLayers;
  const selectCount = selection.layers.length;

  let selectedText;
  if (selectCount > 0) {
    selectedText = selection.layers[0];
  }

  browserWindow.once("ready-to-show", () => {
    if (selectCount > 0) {
      browserWindow.webContents.executeJavaScript(
        `window.setTextContent(\`${selectedText.text}\`);`
      );
    }
  });

  browserWindow.webContents.on("render", function(rect) {
    const bounds = browserWindow.getBounds();
    const { width, height } = rect;

    //  copy screenshot to clipboard
    runCommand("/usr/sbin/screencapture", [
      `-R${bounds.origin.x},${bounds.origin.y - 150},${width},${height}`,
      "-c",
      "-x"
    ]);

    // get NSImage from clipboard
    const source = NSImage.alloc().initWithPasteboard(
      NSPasteboard.generalPasteboard()
    );

    const generateStyle = () => {
      const style = { width, height };
      if (selectedText) {
        style.top = selectedText.frame.y;
        style.left = selectedText.frame.x;
      }

      return style;
    };

    console.log(generateStyle());

    render(
      React.createElement(Image, {
        name: "Image",
        source: `data:image/png;base64,${imageToBase64(source)}`,
        style: generateStyle()
      }),
      context.document.currentPage()
    );

    if (selectedText) {
      selectedText.remove();
    }

    browserWindow.close();
  });
}
