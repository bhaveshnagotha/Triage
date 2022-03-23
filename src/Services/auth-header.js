export default function authHeader() {
const user = JSON.parse(localStorage.getItem('currentUser'));
if (user && user.id_session) {
    // for Node.js Express back-end
    return { 'x-access-token': user.id_session };
} else {
    return {};
}
}