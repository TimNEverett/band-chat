const CaretDown = () => <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />

const Chat = () => (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M4 2H20C21.1 2 22 2.89999 22 4V16C22 17.1 21.1 18 20 18H6L2 22V4C2 2.89999 2.90002 2 4 2ZM6 16H20V4H4V18L6 16Z"
    fill="currentColor"
  />
)

const Close = () => <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />

const DownArrow = () => (
  <path
    // make a down arrow path
    d="M19 14L12 21L5 14"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
)

const Library = () => (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M8 2H20C21.1 2 22 2.89999 22 4V16C22 17.1 21.1 18 20 18H8C6.90002 18 6 17.1 6 16V4C6 2.89999 6.90002 2 8 2ZM8 16H20V4H8V16ZM12.5 15C13.88 15 15 13.88 15 12.5V7H18V5H14V10.51C13.58 10.19 13.07 10 12.5 10C11.12 10 10 11.12 10 12.5C10 13.88 11.12 15 12.5 15ZM2 6H4V20H18V22H4C2.90002 22 2 21.1 2 20V6Z"
    fill="currentColor"
  />
)

const Mic = () => (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M15 11.5C15 13.16 13.66 14.5 12 14.5C10.34 14.5 9 13.16 9 11.5V5.5C9 3.84 10.34 2.5 12 2.5C13.66 2.5 15 3.84 15 5.5V11.5ZM12 16.5C14.76 16.5 17 14.26 17 11.5H19C19 15.03 16.39 17.93 13 18.42V21.5H11V18.42C7.61 17.93 5 15.03 5 11.5H7C7 14.26 9.24 16.5 12 16.5Z"
    fill="current"
    stroke="currentColor"
  />
)

const Save = () => (
  <path
    d="M8.79496 15.875L4.62496 11.705L3.20496 13.115L8.79496 18.705L20.795 6.70501L19.385 5.29501L8.79496 15.875Z"
    fill="currentColor"
  />
)

const Send = () => <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor" />

const Stop = () => (
  <path fillRule="evenodd" clipRule="evenodd" d="M6 6H18V18H6V6ZM16 16V8H8V16H16Z" fill="currentColor" />
)

const Trash = () => (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM16 9V19H8V9H16ZM6 7H18V19C18 20.1 17.1 21 16 21H8C6.90002 21 6 20.1 6 19V7Z"
    fill="currentColor"
  />
)

const UpArrow = () => (
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
)

const Upload = () => (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.10999 4 6.59998 5.64 5.34998 8.04C2.34003 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04ZM19 18H6C3.78998 18 2 16.21 2 14C2 11.95 3.53003 10.24 5.56 10.03L6.63 9.92L7.13 8.97C8.08002 7.14 9.94 6 12 6C14.62 6 16.88 7.86 17.39 10.43L17.69 11.93L19.22 12.04C20.78 12.14 22 13.45 22 15C22 16.65 20.65 18 19 18ZM10.55 13H8L12 9L16 13H13.45V16H10.55V13Z"
    fill="currentColor"
  />
)

interface IconPaths {
  caretDown: JSX.Element
  chat: JSX.Element
  close: JSX.Element
  downArrow: JSX.Element
  library: JSX.Element
  mic: JSX.Element
  save: JSX.Element
  send: JSX.Element
  stop: JSX.Element
  trash: JSX.Element
  upArrow: JSX.Element
  upload: JSX.Element
}

export type IconPathType =
  | 'caretDown'
  | 'chat'
  | 'close'
  | 'downArrow'
  | 'library'
  | 'mic'
  | 'save'
  | 'send'
  | 'stop'
  | 'trash'
  | 'upArrow'
  | 'upload'

export const IconPaths: IconPaths = {
  caretDown: CaretDown(),
  chat: Chat(),
  close: Close(),
  downArrow: DownArrow(),
  library: Library(),
  mic: Mic(),
  save: Save(),
  send: Send(),
  stop: Stop(),
  trash: Trash(),
  upArrow: UpArrow(),
  upload: Upload(),
}
