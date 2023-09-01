
import { appApi } from '@/api/appApi'
import { useToken } from '@/composables/useToken'
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { LoginErrors, LoginForm } from '@/interfaces/login.interface';
import { initRegisterForm } from '@/interfaces/register.interface';
import { useQuasar } from 'quasar'

export function useLogin() {
  const { saveToken } = useToken()
  const $q = useQuasar()

  const router = useRouter();

  const loginErrors = ref<LoginErrors>({});

  const loading = ref(false);
  const showPassword = ref(false);

  const loginForm = ref<LoginForm>({ ...initRegisterForm });

  const remember = ref(true);

  const login = async () => {
    loading.value = true
    try {
      const response = await appApi.post("/login", loginForm.value)
      saveToken(response.data.access_token)
      router.push('/dashboard');
    } catch (error: any) {
      if (error.response?.status === 422) {
        loginErrors.value = error.response.data.errors;
      }
      if (error.response?.status === 401) {
        $q.notify({ type: 'negative', message: 'Invalid credentials. Please check your username and password.' })
      }
    }
    loading.value = false
  }

  return {
    login,
    loginErrors,
    loading,
    loginForm,
    remember,
    showPassword
  }
}
