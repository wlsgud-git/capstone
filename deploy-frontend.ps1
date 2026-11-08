
# =================================
# Frontend 자동 배포 스크립트
# =================================

$DOCKER_USER = "dirjins"
$IMAGE_NAME = "my-frontend"
$VERSION = "v3"

$DEPLOYMENT = "frontend-deployment"
$CONTAINER = "frontend"

$IMAGE = "${DOCKER_USER}/${IMAGE_NAME}:${VERSION}"

# 1. Docker 이미지 빌드
Write-Host "`n[1/4] Docker 이미지 빌드 중..." -ForegroundColor Cyan

docker build -t $IMAGE ./frontend

if ($LASTEXITCODE -ne 0) {
    throw "Docker 이미지 빌드 실패"
}

# 2. Docker Hub Push
Write-Host "`n[2/4] Registry Push 중..." -ForegroundColor Cyan

docker push $IMAGE

if ($LASTEXITCODE -ne 0) {
    throw "Registry Push 실패"
}

# 3. Kubernetes 이미지 업데이트
Write-Host "`n[3/4] Kubernetes 이미지 업데이트 중..." -ForegroundColor Cyan

kubectl set image deployment/$DEPLOYMENT `
    $CONTAINER=$IMAGE

if ($LASTEXITCODE -ne 0) {
    throw "Deployment 이미지 변경 실패"
}

# 4. 배포 완료 확인
Write-Host "`n[4/4] 배포 상태 확인 중..." -ForegroundColor Cyan

kubectl rollout status deployment/$DEPLOYMENT

if ($LASTEXITCODE -ne 0) {
    throw "Kubernetes 배포 실패"
}

Write-Host "`nFrontend 배포 완료!" -ForegroundColor Green
