import { ref }  from 'vue'

export function getApi(){
    const api = ref('https://ntu-eat.com/api/')
    return api
}

export function popup(msg, buttonMsg, icon){
    this.$swal.fire({
        text: msg,
        icon: icon,
        confirmButtonText: buttonMsg,
        iconColor: '#EBDECE',
        customClass: {
        icon: 'popup-icon',
        confirmButton: 'popup-button',
        text: 'popup-text',
        popup: 'popup',
        }
    })

    return popup
}




