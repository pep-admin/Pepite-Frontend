export const findRelationColor = relationType => {
  switch (relationType) {
    case 'close_friend':
      return '#ff7b00';
    case 'friend':
      return '#f29e50';
    case 'followed':
      return '#24a5a5';
    case 'self':
      return '#FDFDFD';
    default:
      return '#FDFDFD';
  }
};
