export default function userSerializer(data) {
  return {
    token: data.token,
    username: data.user.username,
    avatar: data.user.avatar,
  };
}
