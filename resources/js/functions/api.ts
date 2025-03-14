
export async function jsonFetch(url: string, params: RequestInit = {}) {

    let headers: HeadersInit = {
        'Accept': 'application/json',
        //'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') as string,
        'X-Socket-ID' : window.Echo.socketId()
    }

    const response = await fetch(url, {
        method : params.method ?? 'GET',
        headers: headers,
        credentials: 'include',
        ...params
    });

    if (response.status === 204) {
        return null
    }

    const data = await response.json();

    if (response.ok) {
        return data;
    }

    throw new Error(data?.message ?? 'Oups something went wrong !')
}
