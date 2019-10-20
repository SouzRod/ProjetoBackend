module.exports = {
    ERROR: {
        001: {
            status: 400,
            message: "E-mail já existente"
        },
        002: {
            status: 401,
            message: "Usuário e/ou senha inválidos"
        },
        003: {
            status: 401,
            message: "Não autorizado"
        },
        004: {
            status: 401,
            message: "Sessão inválida"
        },
        005: {
            status: 404,
            message: "Usuário não encontrado"
        }
    },
    GenericError: function(status, message) {
        this.status = status
        this.message = message
    }
}