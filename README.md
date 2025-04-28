# API Key Server with FastAPI and React

이 프로젝트는 FastAPI 백엔드와 React 프론트엔드로 구성된 API 키 관리 시스템입니다. API 키를 생성하고 검증하는 기능을 제공합니다.

## 프로젝트 구조

```
.
├── frontend/          # React 프론트엔드
├── main.py           # FastAPI 백엔드
├── requirements.txt  # Python 의존성
└── .env             # 환경 변수 설정
```

## 기술 스택

### 백엔드
- FastAPI
- Python 3.x
- Uvicorn
- Python-dotenv

### 프론트엔드
- React
- TypeScript
- Vite

## 설치 및 실행 방법

### 백엔드 실행

1. Python 가상환경 생성 및 활성화:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 또는
.\venv\Scripts\activate  # Windows
```

2. 의존성 설치:
```bash
pip install -r requirements.txt
```

3. 서버 실행:
```bash
uvicorn main:app --reload
```

서버는 기본적으로 `http://localhost:8000`에서 실행됩니다.

### 프론트엔드 실행

1. 프론트엔드 디렉토리로 이동:
```bash
cd frontend
```

2. 의존성 설치:
```bash
npm install
```

3. 개발 서버 실행:
```bash
npm run dev
```

프론트엔드는 기본적으로 `http://localhost:5173`에서 실행됩니다.

## API 엔드포인트

- `GET /`: 기본 환영 메시지
- `GET /protected`: API 키가 필요한 보호된 라우트
- `POST /generate-key`: API 키 생성/조회

## 환경 변수 설정

`.env` 파일에 다음 변수를 설정해야 합니다:
```
API_KEY=your_api_key_here
```

API 키는 자동으로 생성되며, 서버 시작 시 `.env` 파일에 저장됩니다.

## CORS 설정

현재 다음 origin에서의 요청이 허용됩니다:
- http://localhost:5173
- http://localhost:5174
- http://localhost:5175
- http://localhost:5176

## 보안

- API 키는 환경 변수로 관리됩니다.
- 모든 보호된 라우트는 API 키 검증이 필요합니다.
- CORS는 특정 origin으로 제한되어 있습니다.

## 개발 가이드

1. API 키를 요청 헤더에 포함:
```
X-API-Key: your_api_key_here
```

2. 로깅은 DEBUG 레벨로 설정되어 있어 API 키 검증 과정을 모니터링할 수 있습니다.

## 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 