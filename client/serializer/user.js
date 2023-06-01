export default function userSerializer(data) {
  return {
    token: data.token,
    username: data.username,
    avatar: data.avatar,
  };
}
