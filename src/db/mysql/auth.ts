import squel from 'squel';
import { DBQuery } from '../../models/mysql';
import { User, LoginUser } from '../../interfaces/User';
import bcrypt from 'bcryptjs';

squel.cls.DefaultQueryBuilderOptions.replaceSingleQuotes = true;

const register = async (
  user: User
): Promise<{ success: boolean; result: any }> => {
  try {
    const q = squel
      .insert()
      .into('users')
      .set('username', user.username)
      .set('email', user.email)
      .set('password', user.password)
      .toString();
    return { success: true, result: await DBQuery(q) };
  } catch (err) {
    return { success: false, result: err };
  }
};

const login = async (
  login: LoginUser
): Promise<{ loginSuccess: boolean; result: string | undefined }> => {
  try {
    const q = squel
      .select()
      .from('users')
      .where('email = ?', login.email)
      .toString();
    const user = await DBQuery(q);
    if (user.result && user.result.length > 0) {
      return {
        loginSuccess: bcrypt.compareSync(
          login.password,
          user.result[0].password
        ),
        result: user.result[0].id,
      };
    }
    return {
      loginSuccess: false,
      result: 'invalid login',
    };
  } catch (err) {
    return {
      loginSuccess: false,
      result: err.message,
    };
  }
};

const getByUserID = async (id: number) => {
  try {
    const q = squel.select().from('users').where('id = ?', id).toString();
    return await DBQuery(q);
  } catch (err) {
    return err;
  }
};
export default { register, login, getByUserID };
