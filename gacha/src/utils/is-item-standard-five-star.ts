export const isItemStandardFiveStar = (id: number) => {
  const STANDARD_FIVE_STAR_CHARACTERS = [1033, 1025, 1029, 1027, 1021];
  const STANDARD_FIVE_STAR_WEAPONS = [11044, 10333, 11020, 11016, 11047, 11038];

  return (
    STANDARD_FIVE_STAR_CHARACTERS.includes(id) ||
    STANDARD_FIVE_STAR_WEAPONS.includes(id)
  );
};
