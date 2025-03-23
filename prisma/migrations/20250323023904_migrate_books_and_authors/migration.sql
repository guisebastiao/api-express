-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(250) NOT NULL,
    "author_id" TEXT NOT NULL,
    "isbn" VARCHAR(20) NOT NULL,
    "published_year" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,
    "language" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authors" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "birth_date" VARCHAR(20) NOT NULL,
    "death_date" VARCHAR(20),
    "nationality" VARCHAR(150) NOT NULL,
    "bio" TEXT,
    "photo" VARCHAR(300),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "books_isbn_key" ON "books"("isbn");
