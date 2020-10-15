import { Status } from '../deps.ts'

type errorResponseType = {
    status: Status
    menssage: string
}

type errorFildsResponseType = {
    status: Status
    fields: fildErrorType[]
}

type fildErrorType = {
    field: string,
    message: string
}

const errorResponse = (status: Status, msg: string): errorResponseType => {
    return { status: status, menssage: msg }
}

const errorFieldsResponse = (status: Status, fields: fildErrorType[]): errorFildsResponseType => {
    return { status: status, fields: fields }
}

export { errorResponse, errorResponseType, errorFieldsResponse, errorFildsResponseType, fildErrorType }