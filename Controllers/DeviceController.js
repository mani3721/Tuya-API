import { deleteDevice, deviceCommand, getDeviceInfo } from "../Tuya/TuyaAPI.js";


// get Device Status

  export const deviceStatus = async (req, res) => { 

    try {
        const { client_id, secret, device_id } = req.headers;
        const path = `/v1.0/devices/${device_id}/status`;

        const deviceInfo = await getDeviceInfo(client_id, secret, path);

        res.status(200).json(deviceInfo)
    } catch (error) {
        res.status(500).json(error);
    }

  }

  //get Device Info
  
  export const deviceInfo = async (req, res) => { 

    try {
        const { client_id, secret, device_id } = req.headers;
        const path = `/v1.0/devices/${device_id}`;

        const deviceInfo = await getDeviceInfo(client_id, secret, path);

        res.status(200).json(deviceInfo)
    } catch (error) {
        res.status(500).json(error);
    }

  }

    //get Device Control

      
  export const deviceControl = async (req, res) => { 

    try {
        const { client_id, secret, device_id } = req.headers;

        const path = `/v1.0/devices/${device_id}/commands`

        const deviceInfo = await deviceCommand(client_id, secret, path, req.body);

        res.status(200).json(deviceInfo)
    } catch (error) {
        res.status(500).json(error);
    }

  }

  //get All Devices

  export const getAllDevices =  async (req, res) => { 
    try {
      const { client_id, secret, device_id } = req.headers;
      const path = `/v1.0/devices/status?device_ids=${device_id}`;

      const deviceInfo = await getDeviceInfo(client_id, secret, path);

      res.status(200).json(deviceInfo)
  } catch (error) {
      res.status(500).json(error);
  }
  }

  //delete Device

  export const deviceDelete = async (req, res) => { 
    try {
      const { client_id, secret, device_id } = req.headers;
      const path = `/v1.0/devices/${device_id}`;

      const deviceInfo = await deleteDevice(client_id, secret, path);

      res.status(200).json(deviceInfo)
  } catch (error) {
      res.status(500).json(error);
  }
  }
