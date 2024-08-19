import api from "../lib/axios";


export default {
    create(data) {

        return api.post('/appointments', data)
    },
    getByDate(date) {
        return api.get(`/appointments?date=${date}`)
    },
    getByDate2(date, selectedBarber = '') {
        // Añade el parámetro del barbero a la URL de la solicitud
        return api.get(`/appointmentsss?date=${date}&barber=${selectedBarber}`);
    },
    getUserAppointments(userId) {
        return api.get(`/users/${userId}/appointments`)
    },
    getUserAppointments1(userId) {
        return api.get(`/userss/${userId}/appointments`)
    },
    getById(id) {
        return api.get(`/appointments/${id}`)
    },
    update(id, data){
        return api.put(`/appointments/${id}`, data)
    },
    delete(id){
        return api.delete(`/appointments/${id}`)
    }
}