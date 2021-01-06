import Extension from './brower'
import { checkForError } from './utils'

export const extension = new Extension();

export const sendMessage = (data) => {
  return new Promise((resolve, reject) => {
    extension.runtime.sendMessage(data, (response) => {
      const error = checkForError()
      if (error) {
        return reject(error)
      }
      return resolve(response)
    })
  })
};

const openTab = (options) => {
  return new Promise((resolve, reject) => {
    extension.tabs.create(options, (newTab) => {
      const error = checkForError()
      if (error) {
        return reject(error)
      }
      return resolve(newTab)
    })
  })
}
  
export const openWindow = (options) => {
  return new Promise((resolve, reject) => {
    extension.windows.create(options, (newWindow) => {
      const error = checkForError()
      if (error) {
        return reject(error)
      }
      return resolve(newWindow)
    })
  })
}
  
export const focusWindow = (windowId) => {
  return new Promise((resolve, reject) => {
    extension.windows.update(windowId, { focused: true }, () => {
      const error = checkForError()
      if (error) {
        return reject(error)
      }
      return resolve()
    })
  })
}

export const updateWindowPosition = (windowId, left, top) => {
  return new Promise((resolve, reject) => {
    extension.windows.update(windowId, { left, top }, () => {
      const error = checkForError()
      if (error) {
        return reject(error)
      }
      return resolve()
    })
  })
}

export const getLastFocusedWindow = () => {
  return new Promise((resolve, reject) => {
    extension.windows.getLastFocused((windowObject) => {
      const error = checkForError()
      if (error) {
        return reject(error)
      }
      return resolve(windowObject)
    })
  })
}

export const closeCurrentWindow = () => {
  return extension.windows.getCurrent((windowDetails) => {
    return extension.windows.remove(windowDetails.id)
  })
}

const getVersion = () => {
  return extension.runtime.getManifest().version
}

const getPlatformInfo = (cb) => {
  try {
    extension.runtime.getPlatformInfo((platform) => {
      cb(null, platform)
    })
  } catch (e) {
    cb(e)
    // eslint-disable-next-line no-useless-return
    return
  }
}

const getAllWindows = () => {
  return new Promise((resolve, reject) => {
    extension.windows.getAll((windows) => {
      const error = checkForError()
      if (error) {
        return reject(error)
      }
      return resolve(windows)
    })
  })
}

export const getActiveTabs = () => {
  return new Promise((resolve, reject) => {
    extension.tabs.query({ active: true }, (tabs) => {
      const error = checkForError()
      if (error) {
        return reject(error)
      }
      return resolve(tabs)
    })
  })
}

export const getAllTabs = () => {
  return new Promise((resolve, reject) => {
    extension.tabs.query({}, (tabs) => {
      const error = checkForError()
      if (error) {
        return reject(error)
      }
      return resolve(tabs)
    })
  })
}

export const currentTab = () => {
  return new Promise((resolve, reject) => {
    extension.tabs.getCurrent((tab) => {
      const err = checkForError()
      if (err) {
        reject(err)
      } else {
        resolve(tab)
      }
    })
  })
}

const switchToTab = (tabId) => {
  return new Promise((resolve, reject) => {
    extension.tabs.update(tabId, { highlighted: true }, (tab) => {
      const err = checkForError()
      if (err) {
        reject(err)
      } else {
        resolve(tab)
      }
    })
  })
}

const closeTab = (tabId) => {
  return new Promise((resolve, reject) => {
    extension.tabs.remove(tabId, () => {
      const err = checkForError()
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}