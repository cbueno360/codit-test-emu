import { useApi } from "./useApi";

export const useExamService = () => {
  const [requests] = useApi();

  const examService = {
    create: (exams) => requests.post("/api/GreateExam", exams),
    getAll: () =>
      requests.get(
        "/api/GetExams",
        "83-v75NS2LcLeDcoqt16frxr0gSoeHQEy35aIFIYDOZOAzFu8ujp3g=="
      ),
  };
  return [examService];
};
