export const createUser = async (userData) => {
  try {
    const response = await fetch('https://fullstack-test-navy.vercel.app/api/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    return await response.json()
  } catch (error) {
    return {
      success: false,
      title: 'Error',
      description: 'Failed to connect to server'
    }
  }
}
