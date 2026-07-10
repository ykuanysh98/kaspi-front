import { ref } from "vue";
import { useApi } from "~/shared/api";

export function useOrders() {
  const { get } = useApi();
  const orders = ref([]);
  const loading = ref(false);
  const error = ref<any>(null);

  const fetchOrders = async () => {
    loading.value = true;
    error.value = null;
    try {
      orders.value = await get("/orders");
    } catch (err) {
      console.error(err);
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    orders,
    loading,
    error,
    fetchOrders,
  };
}
