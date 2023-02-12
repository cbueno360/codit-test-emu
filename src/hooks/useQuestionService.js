import { useApi } from "./useApi";

export const useQuestionService = () => {
  const [requests] = useApi();

  const questionService = {
    getAllByExamId: (examId) =>
      requests.get(
        "/api/Exam?id=" + examId,
        "6Tn9GaPALBBXHfkTEU_mwNmmyjcKsUeNc9SOTH0TD0ZhAzFu36W_Dw=="
      ),
  };
  return [questionService];
};
