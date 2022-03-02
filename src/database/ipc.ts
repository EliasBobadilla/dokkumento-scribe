import { ipcMain } from 'electron'
import { getAuth, getRoles } from './services/management'
import {
  getFieldTypes,
  getProjects,
  getForms,
  getFormFields,
  saveForm,
  upsertProject,
  deleteProject,
  upsertForm,
  deleteForm,
  upsertFormFields,
} from './services/documents'

ipcMain.handle('getAuth', (_, props) => getAuth(props))
ipcMain.handle('getRoles', () => getRoles())
ipcMain.handle('getFieldTypes', () => getFieldTypes())
ipcMain.handle('getProjects', () => getProjects())
ipcMain.handle('getForms', () => getForms())
ipcMain.handle('getFormFields', () => getFormFields())
ipcMain.handle('saveForm', (_, props) => saveForm(props))
ipcMain.handle('upsertProject', (_, props) => upsertProject(props))
ipcMain.handle('deleteProject', (_, props) => deleteProject(props))
ipcMain.handle('upsertForm', (_, props) => upsertForm(props))
ipcMain.handle('deleteForm', (_, props) => deleteForm(props))
ipcMain.handle('upsertFormFields', (_, props) => upsertFormFields(props))
