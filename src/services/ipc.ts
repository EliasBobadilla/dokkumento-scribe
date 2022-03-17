import { ipcMain } from 'electron'
import { getAuth, getRoles } from './auth'
import { deleteProject, getProjects, upsertProject } from './projects'
import { deleteForm, getForms, saveFormValues, upsertForm } from './forms'
import { getFieldTypes, getFormFields, upsertFormFields } from './fields'
import {
  getDataFromTdTables,
  getDataFromDigTable,
  getSettings,
  getDbValidation,
} from './data'

ipcMain.handle('getAuth', (_, props) => getAuth(props))
ipcMain.handle('getRoles', () => getRoles())
ipcMain.handle('getFieldTypes', () => getFieldTypes())
ipcMain.handle('getProjects', () => getProjects())
ipcMain.handle('getForms', () => getForms())
ipcMain.handle('getFormFields', () => getFormFields())
ipcMain.handle('getDataSource', () => getDataFromTdTables())
ipcMain.handle('saveForm', (_, props) => saveFormValues(props))
ipcMain.handle('upsertProject', (_, props) => upsertProject(props))
ipcMain.handle('deleteProject', (_, props) => deleteProject(props))
ipcMain.handle('upsertForm', (_, props) => upsertForm(props))
ipcMain.handle('deleteForm', (_, props) => deleteForm(props))
ipcMain.handle('upsertFormFields', (_, props) => upsertFormFields(props))
ipcMain.handle('getDataFromDigTable', (_, props) => getDataFromDigTable(props))
ipcMain.handle('getSettings', () => getSettings())
ipcMain.handle('getDbValidation', (_, props) => getDbValidation(props))
