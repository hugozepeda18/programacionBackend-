import bcrypt from 'bcrypt'

const encrypt = async (pwd) => {

    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pwd, salt);
}
const compare = async (reqPassword, userPassword) => {
    const validPwd = await bcrypt.compare(reqPassword, userPassword)
    return validPwd
}

export default {
    encrypt,
    compare
}