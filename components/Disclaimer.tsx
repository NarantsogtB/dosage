export default function Disclaimer() {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4">
      <div className="flex gap-3">
        <div className="shrink-0 mt-0.5">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="text-sm text-blue-800">
          <p className="font-semibold mb-1">Эмчид зориулсан туслах хэрэгсэл</p>
          <p className="leading-relaxed">
            Энэхүү тооцоолуур нь эмнэлзүйн шийдвэр гаргахад дэмжлэг болох
            зорилготой бөгөөд мэргэжлийн эмчийн үнэлгээг орлохгүй. Тунг BNF for
            Children, Монгол улсын клиникийн удирдамжтай тулган баталгаажуулна
            уу. Зохиогч этгээд аливаа алдаа, орхигдолд хариуцлага хүлээхгүй.
          </p>
        </div>
      </div>
    </div>
  );
}
