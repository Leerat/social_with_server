const theme = {
  color:'#334',
  number: 1.2,
  multiInterval: function(m=1) { return `${this.number*m}vh`},
  get interval() {return `${this.number}vh`},
  red: '#f33',
  green: '#129866',
  dark: '#50639c',
  light: '#8a6bec'
}

export default theme
