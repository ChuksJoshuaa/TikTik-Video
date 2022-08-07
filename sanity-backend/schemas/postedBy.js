// To keep track of users that commented/posted

export default {
    name: 'postedBy',
    title: 'Posted By',
    type: 'reference',
    to: [{type: 'user'}]
}