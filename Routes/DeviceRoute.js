import express from 'express'
import { deviceControl, deviceDelete, deviceInfo, deviceStatus, getAllDevices } from '../Controllers/DeviceController.js'

const router = express.Router()

router.get("/status", deviceStatus)
router.get("/info", deviceInfo)
router.post("/command", deviceControl)
router.get("/getalldevices", getAllDevices)
router.delete("/delete", deviceDelete)


export default router
