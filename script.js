const connectButton = document.getElementById('connectButton');
const sendButton = document.getElementById('sendButton');
const output = document.getElementById('output');

let device = null;

connectButton.addEventListener('click', async () => {
  try {
    if (device) {
      output.textContent = 'Dispositivo já conectado.';
      return;
    }
    device = await navigator.usb.requestDevice({ filters: [] });
    output.textContent = `Dispositivo conectado:
    \nVendor ID: ${device.vendorId}
    \nProduct ID: ${device.productId}`;
    await device.open();
    if (device.configuration === null) {
      await device.selectConfiguration(1);
    }
    await device.claimInterface(0);
    output.textContent += '\nInterface reivindicada. Pronto para comunicação!';
  } catch (error) {
    output.textContent = `Erro: ${error.message}`;
  }
});


sendButton.addEventListener('click', async () => {
  if (!device) {
    output.textContent = 'Nenhum dispositivo conectado.';
    return;
  }

  try {
    const data = new Uint8Array([0x01, 0x02, 0x03]);
    await device.transferOut(1, data);
    output.textContent += '\nDados enviados!';
  } catch (error) {
    output.textContent = `Erro ao enviar dados: ${error.message}`;
  }
});