import { ipcMain } from 'electron'
import { getAuth, getRoles } from './services/management'
import {
  getFieldTypes,
  getProjects,
  getForms,
  getFormFields,
  saveForm,
} from './services/documents'

ipcMain.handle('getAuth', (_, props) => getAuth(props))
ipcMain.handle('getRoles', (_) => getRoles())
ipcMain.handle('getFieldTypes', (_) => getFieldTypes())
ipcMain.handle('getProjects', (_) => getProjects())
ipcMain.handle('getForms', (_, props) => getForms(props))
ipcMain.handle('getFormFields', (_, props) => getFormFields(props))
ipcMain.handle('saveForm', (_, props) => saveForm(props))
