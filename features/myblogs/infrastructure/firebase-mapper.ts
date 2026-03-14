import type {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from "firebase/firestore";

const getConverter = <T extends object>(
  assert: (data: unknown) => asserts data is T,
): FirestoreDataConverter<T> => ({
  toFirestore: (data: WithFieldValue<T>) => {
    assert(data);
    return data;
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot) => {
    const data = snapshot.data({ serverTimestamps: "estimate" });

    const result = Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (
          typeof value.toString == "function" &&
          value.toString().startsWith("Timestamp")
        ) {
          return [key, value.toDate()];
        }
        return [key, value];
      }),
    );

    assert(result);

    return result;
  },
});
