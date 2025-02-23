import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { NotificationContextProvider } from './contexts/NotificationContext'

const queryClient = new QueryClient()

import store from './store/store'
console.log(store.getState())

createRoot(document.getElementById('root')).render(
  <NotificationContextProvider>
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </StrictMode>
    </QueryClientProvider>
  </NotificationContextProvider>
)
