// const connectButton = document.getElementById('connectButton');
// const sendButton = document.getElementById('sendButton');
// const output = document.getElementById('output');

// let device = null;

// connectButton.addEventListener('click', async () => {
//   try {
//     device = await navigator.usb.requestDevice({ filters: [] });
//     output.textContent = `Dispositivo conectado:
//     \nVendor ID: ${device.vendorId}
//     \nProduct ID: ${device.productId}`;
//     await device.open();
//     if (device.configuration === null) {
//       await device.selectConfiguration(1);
//     }
//     await device.claimInterface(0);
//     output.textContent += '\nInterface reivindicada. Pronto para comunicação!';
//   } catch (error) {
//     output.textContent = `Erro: ${error.message}`;
//   }
// });

// sendButton.addEventListener('click', async () => {
//   if (!device) {
//     output.textContent = 'Nenhum dispositivo conectado.';
//     return;
//   }

//   try {
//     const data = new Uint8Array([0x01, 0x02, 0x03]);
//     await device.transferOut(1, data);
//     output.textContent += '\nDados enviados!';
//   } catch (error) {
//     output.textContent = `Erro ao enviar dados: ${error.message}`;
//   }
// });

import Adb from '@yume-chan/adb';

const connectButton = document.getElementById('connectButton');
const flashlightButton = document.getElementById('flashlightButton');
const cameraButton = document.getElementById('cameraButton');
const output = document.getElementById('output');

let adbDevice = null;

connectButton.addEventListener('click', async () => {
  try {
    const transport = await Adb.WebUsbTransport.request();
    adbDevice = new Adb(transport);
    await adbDevice.connect();

    output.textContent = `Dispositivo conectado: ${adbDevice.serial}`;
  } catch (error) {
    output.textContent = `Erro: ${error.message}`;
  }
});

flashlightButton.addEventListener('click', async () => {
  if (!adbDevice) {
    output.textContent = 'Nenhum dispositivo conectado.';
    return;
  }

  try {
    const shell = await adbDevice.shell('echo 1 > /sys/class/leds/flashlight/brightness');
    output.textContent += '\nLanterna acesa!';
  } catch (error) {
    output.textContent = `Erro ao acender a lanterna: ${error.message}`;
  }
});

sendButton.addEventListener('click', async () => {
  if (!device) {
    output.textContent = 'Nenhum dispositivo conectado.';
    return;
  }

  try {
    // Comando para abrir a câmera ou acender a lanterna
    const command = new TextEncoder().encode("am start -a android.media.action.STILL_IMAGE_CAMERA\n");
    await device.transferOut(1, command);
    output.textContent += '\nComando enviado!';
  } catch (error) {
    output.textContent = `Erro ao enviar comando: ${error.message}`;
  }
});


