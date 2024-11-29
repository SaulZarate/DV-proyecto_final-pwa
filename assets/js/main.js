const APP_NAME = "TurApp";
const URL_API = "https://dv-proyectofinal.infy.uk/api/v1/"

/* ----------------------- */
/*      MIS FUNCIONES      */
/* ----------------------- */

function printFormData(formData){
  for (var pair of formData.entries()) {
    console.log(pair[0]+ ': ' + pair[1]); 
  }
}

function handlerLogout(){
  let data = new FormData()
  data.append("action", "logout");
  
  /* fetch(
    DOMAIN_NAME + "admin/process.php", 
    {
        method: "POST",
        body: data,
    }
  )
  .then(res => res.json())
  .then(response => {
      if(response.status === "OK") location.href = response.redirection
  }) */
}

function isEmailValid(email){
  return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

// Valida que tenga una minuscula, una mayuscula, un numero, un caracter especial y que tenga 8 caracteres
function isPasswordValid(pw) {
  return /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw) && pw.length >= 8;
}

function getOnlyInt(str){
  return str.replace(/\D/g, "");
}

function getOnlyNumber(str){
  return str.replace(/[^0-9\.]+/g,"");
}


/* ------------------- */
/*      MIS CLASES     */
/* ------------------- */

class Util{
  static numberToPrice(price, onlyInteger = false){
    let result =  price.toLocaleString('es-ar', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
    })

    if(onlyInteger){
      result = result.replace("$","").split(",")[0]
    }

    return result.trim()
  }

  static convertBytes(bytes, convert_to = 'KB'){
    let value = 0
    if (convert_to == 'KB') {
      value = (bytes / 1024);
    } else if (convert_to == 'MB') {
      value = (bytes / 1048576);
    } else if (convert_to == 'GB') {
      value = (bytes / 1073741824);
    } else if (convert_to == 'TB') {
      value = (bytes / 1099511627776);
    } else {
      value = bytes;
    }
    return value;
  }

  /**
   * 
   * @param {string} date Y-m-d
   * @returns int
   */
  static dateToAge(date){
    const [year, month, day] = date.split("-")

    const today = new Date();
    let age = today.getFullYear() - year;
    if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
      age--;
    }

    return age
  }

  static ucfirst(str){
    return String(str).charAt(0).toUpperCase() + String(str).slice(1);
  }
}

class HTMLController{
  mainElement = null

  constructor(select = ""){
    if(select){
      this.mainElement = document.querySelector(select)
    }else{
      this.mainElement = document.querySelector("body") 
    }

  }

  addClass(select, list){
    for (let element of this.mainElement.querySelectorAll(select)) {
      for (const item of list.split(" ")) {
        element.classList.add(item)
      }
    }
  }
  
  removeClass(select, list){
    for (let element of this.mainElement.querySelectorAll(select)) {
      for (const item of list.split(" ")) {
        element.classList.remove(item)
      }
    }
  }

  /**
   * Agrega/modifica las propiedades de los elementos 
   * @param {string} select Selector de los elementos
   * @param {object} prop {nameProperty: value, ...}
   */
  updateProp(select, prop){
    for (let element of this.mainElement.querySelectorAll(select)) {
      for (const [key, value] of Object.entries(prop)) {
        element[key] = value
      }
    }
  }


  static setProp(select, prop){
    for (let element of document.querySelectorAll(select)) {
      for (const [key, value] of Object.entries(prop)) {
        element[key] = value
      }
    }
  }

  static selectElementVisible(select){
    let elements = []
    for (let element of document.querySelectorAll(select)) {
      /* if(element.style.display == "none") continue; */
      if(element.offsetParent === null) continue;

      // Elemento visible
      elements.push(element)
    }

    return elements
  }

  static trigger(select, eventName){
    // Crear un nuevo evento personalizado
    const event = new Event(eventName, {
      bubbles: true, // Si deseas que el evento burbujee hacia arriba
      cancelable: true // Si deseas que el evento pueda ser cancelado
    });

    // Despachar el evento en el elemento proporcionado
    for (const element of document.querySelectorAll(select)) {
      element.dispatchEvent(event);
    }
  }

  static deleteParentElement(el, selectParent){
    el.closest(selectParent).remove()
  }

  static printElement(select){
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head>' + document.querySelector("head").innerHTML + '</head>');
    mywindow.document.write('<body >');
    mywindow.document.write('<h1>' + document.title  + '</h1>');
    mywindow.document.write(document.querySelector(select).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    return true;
  }
}

class HTTP{
  static redirect(url){
    location.href = url
  }

  static openWindow(url){
    window.open(url)
  }

  static backURL(){
    history.back()
  }
}

class TextareaEditor{
  selector = ""
  textarea = null

  constructor(selector = ""){
    if(selector) this.setElement(selector)
  }
  
  setElement(selector){
    this.selector = selector
    this.textarea = document.querySelector(selector)
  }

  static initOnlyShow(selector){
    new Quill(selector, {
      readOnly: true,
      modules: { toolbar: false },
      theme: 'snow'
    }).enable(false);
  }

  getHTML(){
    return this.textarea.getSemanticHTML()
  }

  /**
   * Inicializa un textarea editable básico que cuenta con las siguientes opciones:
   * - Tamaños de letras
   * - bold | italic | underline | strike | link
   * - color de texto | color de fondo
   * - listas ordenadas | listas desordenadas | alineación
   * - Limpiador de estilos
   * 
   * @param {*} option 
   * 
   * @return void
   */
  initBasic(option = null){
    if(!option) {
      option = {
        theme: 'snow',
        modules: {
          toolbar: [
            [
              {
                size: []
              }
            ],
            ["bold", "italic", "underline", "strike", "link"],
            [
              {
                color: []
              }, 
              {
                background: []
              }
            ],
            [
              {
                list: "ordered"
              },
              {
                list: "bullet"
              },
              {
                align: []
              }
            ],
            ["clean"]
          ]
        }
      }
    }

    this.textarea = new Quill(this.selector, option);
  }

  initBasicText(){
    const option = {
      theme: 'snow',
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike", "link"],
          [
            {
              color: []
            }, 
            {
              background: []
            }
          ],
          [
            {
              list: "ordered"
            },
            {
              list: "bullet"
            },
            {
              align: []
            }
          ],
          ["clean"]
        ]
      }
    }

    this.textarea = new Quill(this.selector, option);
  }

  initFull(option = {}){
    if(!option){
      if(!option["image"]) option["image"] = ""
      if(!option["video"]) option["video"] = ""
    }
    
    let listLinkImageVideo = ["link"]
    if(option["image"] != "none") listLinkImageVideo.push("image")
    if(option["video"] != "none") listLinkImageVideo.push("video")

    this.textarea = new Quill(this.selector, {
      modules: {
        toolbar: [
          [{
            size: []
          }],
          ["bold", "italic", "underline", "strike"],
          [{
              color: []
            },
            {
              background: []
            }
          ],
          [{
              script: "super"
            },
            {
              script: "sub"
            }
          ],
          [{
              list: "ordered"
            },
            {
              list: "bullet"
            },
            {
              indent: "-1"
            },
            {
              indent: "+1"
            }
          ],
          ["direction", {
            align: []
          }],
          listLinkImageVideo,
          ["clean"]
        ]
      },
      theme: "snow"
    });
  }

  setContent(content = ""){
    this.textarea.setText(content)
    this.textarea.update();
  }
}

class FormController{

  // Validacion de inputs/selects de formularios
  static validateForm(elementForm, min=1){

    const tagNameElement = elementForm.tagName.toLowerCase()
    const typeElement = elementForm.type
    const valueElement = elementForm.value.trim()

    // Validaciones especiales para inputs
    if(["text", "email", "password", "tel"].includes(typeElement)){
      if(typeElement === "email"){
        if(isEmailValid(valueElement)) elementForm.classList.remove("is-invalid")
          else elementForm.classList.add("is-invalid")
        return
      }
      
      if(typeElement === "password"){
        if(isPasswordValid(valueElement)) elementForm.classList.remove("is-invalid")
        else elementForm.classList.add("is-invalid")
        return
      }

      if(typeElement === "tel"){
        if(getOnlyInt(valueElement).length < min) elementForm.classList.add("is-invalid")
        else elementForm.classList.remove("is-invalid")
        elementForm.value = getOnlyInt(valueElement)  
        return
      }

      if(typeElement === "number"){
        if(getOnlyNumber(valueElement).length < min) elementForm.classList.add("is-invalid")
        else elementForm.classList.remove("is-invalid")
        elementForm.value = getOnlyNumber(valueElement)  
        return
      }
    }


    // Validacion de fechas
    if(typeElement === "date"){
      if(valueElement.length != 10) elementForm.classList.add("is-invalid")
      else elementForm.classList.remove("is-invalid")
      return
    }

    // Validacion de horas
    if(typeElement === "time"){
      if(valueElement.length != 5) elementForm.classList.add("is-invalid")
      else elementForm.classList.remove("is-invalid")
      return
    }

    // Validacion general
    if(valueElement.length < min) elementForm.classList.add("is-invalid")
    else elementForm.classList.remove("is-invalid")
  }


  static trigger(select, eventName){
    // Crear un nuevo evento personalizado
    const event = new Event(eventName, {
      bubbles: true, // Si deseas que el evento burbujee hacia arriba
      cancelable: true // Si deseas que el evento pueda ser cancelado
    });

    // Despachar el evento en el elemento proporcionado
    for (const element of document.querySelectorAll(select)) {
      element.dispatchEvent(event);
    }
  }
}

class FormButtonSubmitController extends FormController{
  elBtnSubmit = null
  contentHTMLBtnSubmit = ""
  /* htmlLoadingBtnSubmit = `Subiendo...` */
  htmlLoadingBtnSubmit = `<i class="fas fa-spinner fa-pulse me-1"></i>Subiendo...`

  /**
   * 
   * @param {string|object} element Puede ser un selector o un elemento html
   * @param {bool} isSelector Indica si el paramatro element es un objeto
   */
  constructor(element, isSelector = true){
    const el = isSelector ? document.querySelector(element) : element

    super();

    this.elBtnSubmit = el
    this.contentHTMLBtnSubmit = el.innerHTML
  }

  init(htmlButton = ""){
    this.elBtnSubmit.innerHTML = htmlButton ? htmlButton : this.htmlLoadingBtnSubmit
    this.elBtnSubmit.disabled = true
  }

  reset(){
    this.elBtnSubmit.innerHTML = this.contentHTMLBtnSubmit
    this.elBtnSubmit.disabled = false
  }
}