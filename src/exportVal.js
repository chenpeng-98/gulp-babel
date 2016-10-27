export default {
  data: {
    bool: true,
    isSafe: true,
    msg: 'from child'
  },
  methods: {
    deal(res) {
      res ++;
      return res;
    }
  }
}